# Policy Specification Language

The reTHINK Policy Specification Language is a language tailored to the needs of the reTHINK framework. Policies following this language use a closed vocabulary that gives the ability to configure user or service provider configurations in an expressive and flexible way.

## Policy Syntax

The fields of a policy and the syntax of each of them is presented in Figure 1. For user policies, the **key** field is a unique string that prevents the creation of multiple policies with the same identifier. A policy has a set of rules, where each rule is composed by several fields with enough information to obtain an authorization decision: the **target** of the rule, the **condition** under which the rule applies, the **decision** to represent the authorization decision in case the condition applies, and the **priority**, a relevant field for the first-applicable combining algorithm used to manage the evaluation order of policies. Each policy also has the **actions** field, where the policy administrator may represent any additional action to be executed after the policy evaluation, independently of the authorization decision. Lastly, the **combining-algorithm** field allows the specification of the algorithm that solves possible conflicts in the individual rules results.

```
policy: {
  key: <id>,
  rules: [{
    target: <'global' || hyperty-name || user-url>
    condition: <attribute> <operation> <parameter>,
    decision: <boolean>,
    priority: <integer>
  }],
  actions: [<method>],
  combining-algorithm: <algorithm-name>
}
```
**Figure 1:** Policy syntax

By default, the combining-algorithm rejects a message if any of the rules fail: this behavior is represented by the deny-overrides algorithm. This policy specification language also supports conflict resolution by the means of other combinations of the rules results, namely the allow-overrides and the first-applicable algorithms. For the former, the message is accepted if at least one rule authorizes it; for the latter, the rules are evaluated following the order given by the priority field, and the decision of the first that applies (either deny or allow), is the final result of the policy evaluation.

## Rule Syntax

As shown in Figure 1, a rule is comprised by four fields, the target, the condition, the decision, and the priority.

#### Target

Generally, we do not want to apply the same authorization decision independently of the event characteristics. The reTHINK environment is especially diverse in this matter as it is possible to have a wide variety of hyperties being executed, and several identities being used. While it is useful to specify policies to be applied to all messages, it is also interesting to be able to specify policies to only apply on messages that concern a given hyperty or an identity. To take into account this feature, a reTHINK policy allows the specification of its rules target in the **target** field. In this field it is possible to find the 'global' string, a user URL, or a hyperty name. The first option, the 'global' string, is used when the rule is to be applied to all messages exchanged between hyperties. The second option, a user URL, is used when the rule is to be applied to messages where the owner of the source/destination hyperty or data object is the given user URL. The third option, a hyperty name, is used when the rule is to be applied to messages where the name of the source/destination hyperty is the said hyperty name.

#### Condition

Even though the target field already enables the specification of to which messages apply a policy, it may be also useful to further restrict policy applicability by stating under which conditions the policy is to be consulted. In a reTHINK policy, this is done in the **condition** field, where it is specified the system attribute to verify, the parameter it is limited to, and the operation to use to do the verification.

A survey on useful policies in the reTHINK framework was carried, and the contribution of the reTHINK partners revealed that it would be useful if the system allowed the specification of different behaviors according to group membership, user presence in blacklists, domain of the user identity, resources used in the communication attempt, or time sensitive preferences (time of the day, weekday or date). Adding to this, it is also useful that the user can specify previously authorized users that can subscribe his hyperties.
Such system attributes are always associated with one parameter that describes or restricts its expected value. Taking into account the system attributes previously presented, this parameter can be a string representing a group name, a user identity domain, a resource type (for instance, chat or video), the time of the day, a weekday or a date. The type of operation to do to verify an attribute value against a given parameter is done through the **operation** field. This field of the condition states how the evaluation of the policy must deal with the system attribute and its parameter independently of what the system attribute is. For instance, the operation may verify if the system attribute is equal to the parameter, if it is part of a collection, or if its value is greater than or less than the parameter.

As shown in Figure 1, the condition field is divided in three parts: the attribute, the operation, and the parameter. Table 1 presents which are the attributes the Policy Engine currently supports, and the corresponding keyword to use when specifying the condition, Table 2 presents the supported operations, and Table 3 the parameters expected according to the attribute being verified.

System attribute | Keyword
--- | ---
Message source: username of the message source | source
Message domain: domain of the username of the message source | domain
Date | date
Weekday | weekday
Time of the day | time
Communication type | resourceType
Data object scheme | scheme
Hyperty subscription preferences |subscription

**Table 1**: Attributes supported by the Policy Engine

Description | Operator
--- | ---
Verifies if a given value is part of a collection | in
Verifies if a given value is equal to other | equals
Verifies if a given value is greater that other | greaterThan
Verifies if a given value is less than other | lessThan
Verifies if a given time of the day is within a time interval | between

**Table 2**: Operators supported by the Policy Engine

System attribute | Expected parameter
--- | ---
Message source: email of the message source | String representing a valid email. Ex: alice@gmail.com
Message domain: domain of the username of the message source | String representing a valid domain. Ex: gmail.com
Date | String representing a valid date. Ex: 01/01/2017
Weekday | String representing a valid weekday. Ex: sunday
Time of the day | String representing a valid time of the day using the 24-hour clock notation without hours/minutes separator. Ex: 0800
Communication type | String representing a valid communication type. Ex: audio
Data object scheme | String representing a valid data object scheme. Ex: comm
Hyperty subscription preferences | One out of two special strings: ‘*’ to refer to all subscribers, ‘preauthorized’ to refer to the array of previously authorized subscribers

**Table 3**: Parameter type of the supported attributes

Consider the following example: Alice has been having some difficult days in her personal and professional life, and decides she will take the next day for herself (10/09/2016). To do that, she will block all communication attempts in that day using the reTHINK administration page, which generates the following policy:

```
policy: {
  key: ‘My day’,
  rules: [{
    target: ‘global'
    condition: date equals 10/09/2016,
    decision: false,
    priority: 0
  }],
  actions: [],
  combining-algorithm: deny-overrides
}
```

#### Advanced Conditions

Previously it was presented how to specify policies that only support the verification of one system attribute. This syntax is not enough to specify a policy that expresses an authorization decision based on multiple system attributes, hence the introduction of advanced conditions. This feature is achieved by using the ***and***, ***or*** and ***not*** logical operators to combine a set of attributes verifications. Figure 2 presents the syntax of the condition field used for the specification of an advanced policy using the three logical operators and a combination of them.

```
(a) condition: [and, subcondition1, subcondition2]
(b) condition: [or, subscondition1, subcondition2]
(c) condition: [not, subcondition]
(d) condition: [and, [or, subcondition1, subcondition2], [not, subcondition3]]
```
**Figure 2**: Advanced condition's syntax for the and logical operator (a), for the or logical operator (b), for the not logical operator (c) and for a combination of the three (d)

The use of these logical operators allows to have more expressive rules. The ***not*** logical operator allows the policy administrator to specify the authorization decision when the condition is not met, which is a significant improvement on what the language can represent. Consider this example: Alice decides that her smartphone is to be used exclusively to be contacted by her family. In order to accomplish this, she created a user group, and added all her family contacts to it. Now she needs to tell the reTHINK application that she only wants to receive communication attempts if they come from users of the family group. To do so, she will add the policy represented below to the Policy Engine, where the condition is that the message source is not in the family group. If the not logical operator was not used, the alternative would be to create a rule to block every existing contact, which is not feasible given the universe of existing contacts.

```
policy: {
  key: 'my policy',
  rules: [{
    target: 'global'
    condition: ['not', 'source in family'],
    decision: false,
    priority: 0
  }],
  actions: [],
  combining-algorithm: 'deny-overrides'
}
```

The ***and*** logical operator allows the policy administrator to represent a situation where more than one condition must be met for the policy to be applicable, which also represents an improvement on the expressiveness of the language. Consider the example previously described where Alice had a new smartphone to be exclusively contacted by her family. Alice started participating on a volunteering activity and decided that she also wants to allow her colleagues to reach her. To do so, she will use the PoliThink graphical user interface to create a group for the volunteers contacts, and will generate the policy presented below, where the condition is that the message source is not in the family group and is not in the volunteers group. Without the and logical operator, it would not be possible to achieve this behavior - the universe of possible contacts would still be too big.
```
policy: {
  key: 'my policy',
  rules: [{
    target: 'global'
    condition: ['not', ['and', 'source in family', 'source in volunteers']],
    decision: false,
    priority: 0
  }],
  actions: [],
  combining-algorithm: 'deny-overrides'
}
```


The ***or*** logical operator enables the representation of rule applicability when any of the subconditions is applicable. Considering Alice's example: she decides to be even more selective about who can reach her and when, and from now on she will not allow anyone to contact her before 9 a.m., not even her family or her volunteer colleagues. To do so, she will generate the policy shown in Figure 5, where the condition is either the source is not in her family and volunteers group, or the time is less than 9 a.m..

```
policy: {
  key: 'my policy',
  rules: [{
    target: 'global'
    condition: ['or', ['not', ['and', 'source in family', 'source in volunteers']], ['time lessThan 900']],
    decision: false,
    priority: 0
  }],
  actions: [],
  combining-algorithm: 'deny-overrides'
}
```

Combining several conditions using logical operators greatly improves the expressiveness of the policy specification language enabling the policy administrator to cover more combinations of real-life situations that the user and service provider may use to specify their preferences in the reTHINK framework.

